using System.Collections.Generic;
using api.core.Features.Diff.ContentParsers.Utils;
using Xunit;

namespace api.core.tests.Diff.ContentParsers.Utils
{
    public class HunkSplitterTests
    {
        [Fact]
        public void Can_Split_Valid_Content()
        {
            var splitter = new HunkSplitter();
            var lines = GetValidContentLines();

            var hunkDictionary = splitter.GetHunks(lines);

            Assert.Equal(3, hunkDictionary.Count);

            var firstHunk = hunkDictionary[@"@@ -1,5 +1,5 @@"];
            Assert.Equal(6, firstHunk.Count);
            var secondHunk = hunkDictionary[@"@@ -9,7 +9,7 @@"];
            Assert.Equal(8, secondHunk.Count);
            var thirdtHunk = hunkDictionary[@"@@ -27,7 +27,7 @@"];
            Assert.Equal(8, thirdtHunk.Count);
        }

        private static string[] GetValidContentLines()
        {
            return new []
            {
                @"diff --git a/test2.txt b/test2.txt",
                @"index cb5048b..4fdc616 ",
                @"--- a/test2.txt",
                @"+++ b/test2.txt",
                @"@@ -1,5 +1,5 @@",
                @" 0",
                @"-1",
                @"+11",
                @" 2",
                @" 3",
                @" 4",
                @"@@ -9,7 +9,7 @@",
                @" 8",
                @" 9",
                @" 0",
                @"-1",
                @"+11",
                @" 2",
                @" 3",
                @" 4",
                @"@@ -27,7 +27,7 @@",
                @" 6",
                @" 7",
                @" 8",
                @"-9",
                @"+99",
                @" 0",
                @" 1",
                @" 2"
            };
        }
    }
}
