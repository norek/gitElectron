using LibGit2Sharp;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;

namespace api.core
{
    public partial class SystemConfigurationStorage
    {
        private readonly string configFileName = "application.json";
        private SystemConfiguration configuration;

        public SystemConfigurationStorage()
        {
            configuration = new SystemConfiguration();

            if (!File.Exists(ConfigPath))
            {
                File.WriteAllText(ConfigPath, JsonConvert.SerializeObject(configuration));
            }

            configuration = JsonConvert.DeserializeObject<SystemConfiguration>(File.ReadAllText(ConfigPath));
        }

        public SystemConfiguration GetSystemConfiguration() => configuration;

        private string ConfigPath => Path.Combine(Path.GetDirectoryName(Assembly.GetEntryAssembly().Location), configFileName);

        public void MapRepository(string repositoryToMap)
        {
            if (string.IsNullOrEmpty(repositoryToMap)) return;

            if (configuration.MappedRepositories.Select(repo => repo.Path).Contains(repositoryToMap)) return;

            configuration.MappedRepositories.Add(new MappedRepository(repositoryToMap, false));
        }
    }
}
