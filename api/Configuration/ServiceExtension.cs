using api.core;
using api.core.Features.Commit;
using api.core.Features.Configuration;
using api.core.Features.Status;
using Core.Features.Branch;
using LibGit2Sharp;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace api
{
    public static class ServiceExtensions
    {
        public static IServiceCollection RegisterServices(this IServiceCollection collection, IConfiguration configuration)
        {
            SystemConfigurationStorage configLoader = new SystemConfigurationStorage();
            collection
                .AddSingleton<SystemConfigurationStorage>((sp) => configLoader)
                .AddSingleton<IRepository>((sp) => new Repository(configuration["repositoryPath"]))
                .AddSingleton<IBranchProvider, BranchProvider>()
                .AddSingleton<IRepositoryStatusService, RepositoryStatusService>()
                .AddSingleton<ICommitProvider, CommitProvider>()
                .AddSingleton<IRepositoryOptionsProvider, RepositoryOptionsProvider>()
                .AddSingleton<IDirectoryProvider, DirectoryProvider>()
            ;

            return collection;
        }
    }
}