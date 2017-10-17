using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;

namespace api.core
{
    public class SystemConfigurationStorage
    {
        private readonly string configFileName = "application.json";
        private SystemConfiguration configuration;
        private string ConfigPath => Path.Combine(Path.GetDirectoryName(Assembly.GetEntryAssembly().Location), configFileName);

        public SystemConfigurationStorage()
        {
            configuration = new SystemConfiguration();

            if (!File.Exists(ConfigPath))
            {
                File.WriteAllText(ConfigPath, JsonConvert.SerializeObject(configuration));
            }

            configuration = JsonConvert.DeserializeObject<SystemConfiguration>(File.ReadAllText(ConfigPath));
        }

        internal string GetCurrentRepository()
        {
            var currentRepository = configuration.MappedRepositories.SingleOrDefault(mr => mr.IsCurrent);

            if (currentRepository == null)
            {
                return string.Empty;
            }

            return currentRepository.Path;
        }

        public void SwitchRepository(string newCurrentRepository)
        {
            if (string.IsNullOrEmpty(newCurrentRepository)) return;

            foreach (var repository in configuration.MappedRepositories.Where(s => s.IsCurrent))
            {
                repository.IsCurrent = false;
            }

            var mappedRepository = configuration.MappedRepositories.Single(repository => repository.Path == newCurrentRepository);
            mappedRepository.IsCurrent = true;

            File.WriteAllText(ConfigPath, JsonConvert.SerializeObject(configuration));
        }

        public void MapRepository(string repositoryToMap)
        {
            if (string.IsNullOrEmpty(repositoryToMap)) return;

            if (configuration.MappedRepositories.Select(repo => repo.Path).Contains(repositoryToMap)) return;

            configuration.MappedRepositories.Add(new MappedRepository(repositoryToMap, !configuration.MappedRepositories.Any()));
            File.WriteAllText(ConfigPath, JsonConvert.SerializeObject(configuration));
        }

        public SystemConfiguration GetSystemConfiguration() => configuration;
    }
}
