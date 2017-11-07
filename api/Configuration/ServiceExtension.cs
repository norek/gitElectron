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
using Swashbuckle.AspNetCore.Swagger;

namespace api
{
    public static class ServiceExtensions
    {
        public static IServiceCollection RegisterServices(this IServiceCollection collection,
            IConfiguration configuration)
        {
            collection
                .AddSingleton<SystemConfigurationStorage>()
                .AddSingleton(sp => new RepositoryFactory(sp.GetService<SystemConfigurationStorage>()))
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

        public static IServiceCollection ConfigureCors(this IServiceCollection collection)
        {
            return collection.AddCors(options =>
            {
                options.AddPolicy("AllowAllOrigins",
                    builder =>
                    {

                        builder.WithOrigins("http://localhost:4200", "http://www.github.com").AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin().AllowCredentials();
                    });
            });
        }

        public static IServiceCollection ConfigureSwagger(this IServiceCollection collection)
        {
            return collection
                .AddSwaggerGen(c => { c.SwaggerDoc("v1", new Info {Title = "My API", Version = "v1"}); });
        }
    }
}