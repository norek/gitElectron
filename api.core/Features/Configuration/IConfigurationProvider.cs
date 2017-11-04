using System.Collections.Generic;

namespace api.core.Features.Configuration
{
    public interface IRepositoryOptionsProvider
    {
        RepositoryConfiguration GetRepositoryConfiguration();

        IEnumerable<Remote> GetRemotes();

        void AddNewRemote(Remote remote);

        void RemoveRemote(string name);
    }
}