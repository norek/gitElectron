using System.Collections.Generic;

namespace api.core
{
    public class SystemConfiguration
    {
        public SystemConfiguration()
        {
            MappedRepositories = new List<MappedRepository>();
        }

        public List<MappedRepository> MappedRepositories { get; set; }
    }

    public class MappedRepository
    {
        public MappedRepository()
        {

        }

        public MappedRepository(string path, bool isCurrent)
        {
            Path = path;
            IsCurrent = isCurrent;
        }

        public string Path { get; set; }
        public bool IsCurrent { get; set; }
    }
}
