using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Threading.Tasks;
using api.Configuration;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json.Linq;

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
            services.ConfigureCors()
                .ConfigureSwagger()
                .RegisterServices(_configuration);
     
            services.AddAuthentication(options =>
                {
                    options.DefaultScheme = "Cookies";
                    options.DefaultChallengeScheme = "GitHub";
                    options.DefaultAuthenticateScheme = "Github";
                })
                .AddCookie("Cookies")
                .AddOAuth("GitHub", "Github", o =>
                {
                    o.ClientId = _configuration["github:clientid"];
                    o.ClientSecret = _configuration["github:clientsecret"];
                    o.CallbackPath = new PathString("/signin-github");
                    o.AuthorizationEndpoint = "https://github.com/login/oauth/authorize";
                    o.TokenEndpoint = "https://github.com/login/oauth/access_token";
                    o.UserInformationEndpoint = "https://api.github.com/user";
                    o.ClaimsIssuer = "OAuth2-Github";
                    o.SaveTokens = true;
                    // Retrieving user information is unique to each provider.
                    o.ClaimActions.MapJsonKey(ClaimTypes.NameIdentifier, "id");
                    o.ClaimActions.MapJsonKey(ClaimTypes.Name, "login");
                    o.ClaimActions.MapJsonKey("urn:github:name", "name");
                    o.ClaimActions.MapJsonKey(ClaimTypes.Email, "email", ClaimValueTypes.Email);
                    o.ClaimActions.MapJsonKey("urn:github:url", "url");
                    o.Events = new OAuthEvents
                    {
                        //OnRedirectToAuthorizationEndpoint = async context =>
                        //{
                        //    await Task.FromResult(0);
                        //},
                        //OnRemoteFailure = async context =>
                        //{
                        //    await Task.FromResult(0);
                        //},
                        OnCreatingTicket = async context =>
                        {
                            // Get the GitHub user
                            var request =
                                new HttpRequestMessage(HttpMethod.Get, context.Options.UserInformationEndpoint);
                            request.Headers.Authorization =
                                new AuthenticationHeaderValue("Bearer", context.AccessToken);
                            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                            var response =
                                await context.Backchannel.SendAsync(request, context.HttpContext.RequestAborted);
                            response.EnsureSuccessStatusCode();

                            var user = JObject.Parse(await response.Content.ReadAsStringAsync());

                            context.RunClaimActions(user);
                        }
                    };
                });

            services.AddMvc();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app
                .UseCors("AllowAllOrigins")
                .UseAuthentication()
                .UseDeveloperExceptionPage()
                .UseMiddleware<ExceptionHandlingMiddleware>()
                .UseMvc()
                .UseSwagger()
                .UseSwaggerUI(c => { c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1"); });
            ;
        }
    }
}