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
            collection
                .AddSingleton<SystemConfigurationStorage>()
                .AddSingleton((sp) => new RepositoryFactory(sp.GetService<SystemConfigurationStorage>(), configuration["repositoryPath"]))
                .AddScoped<IBranchProvider, BranchProvider>()
                .AddScoped<IRepositoryStatusService, RepositoryStatusService>()
                .AddScoped<ICommitProvider, CommitProvider>()
                .AddScoped<IRepositoryOptionsProvider, RepositoryOptionsProvider>()
                .AddScoped<IDirectoryProvider, DirectoryProvider>()
            ;

            return collection;
        }
    }
}