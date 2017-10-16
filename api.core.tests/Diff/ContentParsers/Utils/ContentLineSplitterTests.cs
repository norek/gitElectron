using api.core.Features.Diff.ContentParsers.Utils;
using Xunit;

namespace api.core.tests.Diff.ContentParsers.Utils
{
    public class ContentLineSplitterTests
    {
        [Fact]
        public void Can_Split_Content_Into_Lines()
        {
            var splitter = new ContentLineSplitter();

            var lines = splitter.GetContentLines(GetValidContent());

            Assert.Equal(30, lines.Length);
        }

        public string GetValidContent()
        {
            return "diff --git a/test2.txt b/test2.txt\r\nindex cb5048b..4fdc616 100644\r\n--- a/test2.txt\r\n+++ b/test2.txt\r\n@@ -1,5 +1,5 @@\r\n 0\r\n-1\r\n+11\r\n 2\r\n 3\r\n 4\r\n@@ -9,7 +9,7 @@\r\n 8\r\n 9\r\n 0\r\n-1\r\n+11\r\n 2\r\n 3\r\n 4\r\n@@ -27,7 +27,7 @@\r\n 6\r\n 7\r\n 8\r\n-9\r\n+99\r\n 0\r\n 1\r\n 2\r\n";
        }
    }
}
