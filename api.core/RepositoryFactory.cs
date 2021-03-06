﻿using LibGit2Sharp;
using System;
using System.Collections.Generic;
using System.Text;

namespace api.core
{
    public class RepositoryFactory
    {
        private readonly SystemConfigurationStorage _systemConfiguration;
        private object _object = new object();

        private IRepository _currentRepository;
        private Dictionary<string, IRepository> _repositoryContainer = new Dictionary<string, IRepository>();

        public RepositoryFactory(SystemConfigurationStorage systemConfiguration)
        {
            _systemConfiguration = systemConfiguration;
        }

        public IRepository GetRepository()
        {
            lock (_object)
            {
                string repositoryPath = _systemConfiguration.GetCurrentRepository();

                if (string.IsNullOrEmpty(repositoryPath))
                {
                    return new Repository(); ;
                }

                IRepository newCurrentRepository = null;

                if (_repositoryContainer.TryGetValue(repositoryPath, out newCurrentRepository))
                {
                    return newCurrentRepository;
                }
                else
                {
                    _currentRepository = new Repository(repositoryPath);
                    _repositoryContainer.Add(repositoryPath, _currentRepository);

                    return _currentRepository;
                }
            }
        }
    }
}
