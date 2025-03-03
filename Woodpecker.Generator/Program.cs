
using System;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using CsvHelper;

namespace Woodpecker.Generator;

[System.Diagnostics.CodeAnalysis.SuppressMessage("Globalization", "CA1303:Do not pass literals as localized parameters", Justification = "No localization needed.")]
internal static class Program
{
    private const int DefaultNumberOfPuzzles = 1000;

    public static void Main(string[] _)
    {
        Console.Write("Minimum rating: ");
        int minRating = ReadIntegerInput();
        Console.Write("Maximum rating: ");
        int maxRating = ReadIntegerInput();
        Console.Write("Number of puzzles (default is 1000): ");
        int numberOfPuzzles = ReadIntegerInput(defaultValue: DefaultNumberOfPuzzles);
        Console.WriteLine("Generating...");

        using var reader = new StreamReader("./Database/lichess_db_puzzle.csv");
        using var csv = new CsvReader(reader, CultureInfo.InvariantCulture);
        var puzzles = csv.GetRecords<LichessPuzzle>()
            .Where(puzzle => puzzle.Rating >= minRating && puzzle.Rating <= maxRating)
            .OrderBy(puzzle => puzzle.PuzzleId)
            .Take(numberOfPuzzles)
            .ToList();

        var stringBuilder = new StringBuilder("""
        <!DOCTYPE html>
        <html>

        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="icon" href="./favicon.png">
            <link rel="stylesheet" type="text/css" href="./index.css" media="screen">
            <script src="https://kit.fontawesome.com/dbd722dd21.js" crossorigin="anonymous"></script>
        </head>

        <body>
            <div class="puzzle-container">

        """);

        int puzzleNumber = 1;
        foreach (var puzzle in puzzles)
        {
            stringBuilder.AppendLine(CultureInfo.InvariantCulture, $$"""
                    <div>
                        <a href="https://lichess.org/training/{{puzzle.PuzzleId}}" class="puzzle" target="_blank" rel="noopener noreferrer">{{puzzleNumber}}</a>
                        <div class="button-container">
                            <button type="button" class="action-button fa-solid fa-thumbs-up" onclick="markAsSolved(event, {{puzzleNumber}})"></button>
                            <button type="button" class="action-button fa-solid fa-thumbs-down" onclick="markAsFailed(event, {{puzzleNumber}})"></button>
                            <button type="button" class="action-button fa-solid fa-xmark" onclick="markAsUnsolved(event, {{puzzleNumber}})"></button>
                        </div>
                    </div>
            """);

            puzzleNumber++;
        }

        stringBuilder.Append("""
            </div>

            <script src="./index.js"></script>
        </body>

        </html>
        """);

        File.WriteAllText("../docs/index.html", stringBuilder.ToString());
    }

    private static int ReadIntegerInput(int? defaultValue = default)
    {
        string? userInput = Console.ReadLine();
        if (string.IsNullOrWhiteSpace(userInput) && defaultValue.HasValue)
        {
            return defaultValue.Value;
        }

        if (int.TryParse(userInput, out var result))
        {
            return result;
        }

        Console.WriteLine("Entered string could not be parsed as an integer.");
        return ReadIntegerInput();
    }
}

