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
            collection.AddSingleton<IRepository>((sp) => new Repository(configuration["repositoryPath"]));


            collection.AddSingleton<IBranchProvider, BranchProvider>();

            return collection;
        }
    }
}