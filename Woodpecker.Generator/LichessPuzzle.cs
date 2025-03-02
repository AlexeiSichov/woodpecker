namespace Woodpecker.Generator;

[System.Diagnostics.CodeAnalysis.SuppressMessage("Globalization", "CA1812:Avoid uninstantiated internal classes", Justification = "Instantiated by the CSV reader.")]
internal sealed class LichessPuzzle
{
    public required string PuzzleId { get; init; }
    public required int Rating { get; init; }
}
