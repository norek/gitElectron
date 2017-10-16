namespace api.core.Features.Diff
{
    public class FileChangeInfo
    {
        public FileChangeInfo(string filePath, 
            string content, 
            int linesAdded, 
            int linesDeleted)
        {
            FilePath = filePath;
            Content = content;
            LinesAdded = linesAdded;
            LinesDeleted = linesDeleted;
        }

        public string FilePath
        {
            get;
        }

        public string Content
        {
            get;
        }

        public int LinesAdded
        {
            get;
        }

        public int LinesDeleted
        {
            get;
        }
    }
}
