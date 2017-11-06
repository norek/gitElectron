using api.core;
using api.core.Features.Branch;
using api.core.Features.Commit;
using api.core.Features.Configuration;
using api.core.Features.Diff;
using api.core.Features.Diff.ContentParsers.DirectDiffContentParser;
using api.core.Features.Diff.ContentParsers.Utils;
using api.core.Features.Diff.FileChangeInfoProvider;
using api.core.Features.RepositoryOperations;
using api.core.Features.Status;
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
                .AddSingleton((sp) => new RepositoryFactory(sp.GetService<SystemConfigurationStorage>()))
                .AddScoped<IBranchProvider, BranchProvider>()
                .AddScoped<IRepositoryStatusService, RepositoryStatusService>()
                .AddScoped<ICommitProvider, CommitProvider>()
                .AddScoped<IRepositoryOptionsProvider, RepositoryOptionsProvider>()
                .AddScoped<IDirectoryProvider, DirectoryProvider>()
                .AddScoped<IRepositoryOperationsManager, RepositoryOperationsManager>()
                .RegisterDiffServices()
            ;

            return collection;
        }

        public static IServiceCollection RegisterDiffServices(this IServiceCollection collection)
        {
            return collection
                .AddSingleton<IFileChangeInfoProvider, FileChangeInfoProvider>()
                .AddTransient<IContentLineSplitter, ContentLineSplitter>()
                .AddTransient<IHunkSplitter, HunkSplitter>()
                .AddTransient<IHunkHeaderParser, HunkHeaderParser>()
                .AddTransient<IDirectDiffContentParser, DirectDiffContentParser>()
                .AddTransient<IDirectDiffProvider, DirectDiffProvider>();
        }
    }
}