using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace api
{
    public class Startup
    {
        private readonly IConfiguration _configuration;

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
            services.AddCors(options =>
                        {
                            options.AddPolicy("AllowAllOrigins",
                            builder =>
                            {
                                builder.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin();
                            });
                        });

            services.RegisterServices(_configuration);
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseCors("AllowAllOrigins");

            app.UseMvc();

        }
    }
}
