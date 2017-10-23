using api.core.Features.Diff.ContentParsers.DirectDiffContentParser;
using api.core.Features.Diff.ContentParsers.Utils;
using Xunit;

namespace api.core.tests.Diff.ContentParsers.DirectDiffContentParserTests
{
    public class DirectDiffContentParserTests
    {
        private readonly Fixtrue _fixtrue;
        public DirectDiffContentParserTests()
        {
            _fixtrue = new Fixtrue();
        }

        [Fact]
        public void Can_Get_Result_For_Valid_data()
        {
            var result = _fixtrue.Parser.ParseContent(_fixtrue.GetValidContent());

            Assert.NotNull(result);
            //Add assertions to check if data is valid
        }

        class Fixtrue
        {
            public Fixtrue()
            {
                Parser = new DirectDiffContentParser(new ContentLineSplitter(), new HunkSplitter(), new HunkHeaderParser());
            }

            public string GetValidContent()
            {
                return "diff --git a/test2.txt b/test2.txt\r\nindex cb5048b..4fdc616 100644\r\n--- a/test2.txt\r\n+++ b/test2.txt\r\n@@ -1,5 +1,5 @@\r\n 0\r\n-1\r\n+11\r\n 2\r\n 3\r\n 4\r\n@@ -9,7 +9,7 @@\r\n 8\r\n 9\r\n 0\r\n-1\r\n+11\r\n 2\r\n 3\r\n 4\r\n@@ -27,7 +27,7 @@\r\n 6\r\n 7\r\n 8\r\n-9\r\n+99\r\n 0\r\n 1\r\n 2";
            }

            public DirectDiffContentParser Parser
            {
                get;
            }
        }
    }
}
