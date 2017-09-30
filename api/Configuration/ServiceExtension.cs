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
                .AddSingleton<IRepository>((sp) => new Repository(configuration["repositoryPath"]))
                .AddSingleton<IBranchProvider, BranchProvider>()
                .AddSingleton<IRepositoryStatusService, RepositoryStatusService>()
            
            ;

            return collection;
        }
    }
}