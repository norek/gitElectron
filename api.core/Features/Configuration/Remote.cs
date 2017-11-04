namespace api.core.Features.Configuration
{
    public class Remote
    {
        public Remote()
        {

        }

        public Remote(string remoteName, string remoteUrl)
        {
            Name = remoteName;
            Url = remoteUrl;
        }

        public string Name { get; set; }
        public string Url { get; set; }
    }
}