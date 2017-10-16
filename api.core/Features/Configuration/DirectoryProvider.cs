using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;

namespace api.core.Features.Configuration
{
    public class DirectoryProvider : IDirectoryProvider
    {
        public DirectoryInfo GetDirectoryList(string path)
        {
            DirectoryInfo directoryInfo = new DirectoryInfo();

            if (string.IsNullOrEmpty(path))
            {
                path = Directory.GetDirectoryRoot(Assembly.GetEntryAssembly().Location);
                directoryInfo.IsRoot = true;
            }

            directoryInfo.Path = path;
            directoryInfo.IsMapped = false;
            directoryInfo.IsGitDirectory = IsGitDirectory(path);
            directoryInfo.ParentPath = Directory.GetParent(path)?.FullName;
            directoryInfo.SubDirectories = Directory.GetDirectories(path).Select(d => new SubDirectoryInfo() { Path = d, IsMapped = false, IsGitDirectory = IsGitDirectory(d) }).ToList();

            return directoryInfo;
        }

        private bool IsGitDirectory(string path)
        {
            try
            {
                return Directory.EnumerateDirectories(path).Any(d => d == Path.Combine(path, ".git"));
            }
            catch (Exception)
            {
                return false;
            }
        }
    }

    public class DirectoryInfo
    {
        public string Path { get; set; }
        public bool IsRoot { get; set; }
        public bool IsMapped { get; set; }
        public bool IsGitDirectory { get; set; }
        public string ParentPath { get; internal set; }

        public IList<SubDirectoryInfo> SubDirectories { get; set; }
    }

    public class SubDirectoryInfo
    {
        public string Path { get; set; }
        public bool IsMapped { get; set; }
        public bool IsGitDirectory { get; set; }
    }
}
