using System;
using api.core.Features.Diff.ContentParsers.Utils;
using Xunit;

namespace api.core.tests.Diff.ContentParsers.Utils
{
    public class HunkHeaderParserTests
    {
        [Theory]
        [InlineData("@ -28,8 +29,8 @@")]
        [InlineData("@@ -28,8 +29,8 @")]
        [InlineData("@@ 28,8 +29,8 @@")]
        [InlineData("@@ -28,8 29,8 @@")]
        [InlineData("@@ -28,8 29,8 @@")]
        public void Throws_For_Invalid_Header(string header)
        {
            var parser = new HunkHeaderParser();

            Assert.Throws<FormatException>(() =>
            {
                var result = parser.ParseHeader(header);
            });
        }
        
        [Fact]
        public void Can_Parse_Valid_Header()
        {
            var header = "@@ -28,8 +29,9 @@";
            var parser = new HunkHeaderParser();

            var result = parser.ParseHeader(header);

            Assert.Equal(8, result.Before.NumberOfLines);
            Assert.Equal(28, result.Before.StartingLineNumber);
            Assert.Equal(9, result.After.NumberOfLines);
            Assert.Equal(29, result.After.StartingLineNumber);
        }

        [Fact]
        public void Can_Parse_Valid_Header_Without_Lines_Before()
        {
            var header = "@@ -1 +1,4 @@";
            var parser = new HunkHeaderParser();

            var result = parser.ParseHeader(header);

            Assert.Equal(0, result.Before.NumberOfLines);
            Assert.Equal(1, result.Before.StartingLineNumber);
            Assert.Equal(4, result.After.NumberOfLines);
            Assert.Equal(1, result.After.StartingLineNumber);
        }
    }
}
