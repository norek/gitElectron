namespace api.core.Features.Configuration
{
    public class UserInfo
    {
        public UserInfo()
        {

        }

        public UserInfo(string name, string email)
        {
            Name = name;
            Email = email;
        }

        public string Name { get; set; }
        public string Email { get; set; }
    }

}
