using System;

namespace api.core.Features.Configuration
{
    public class SignatureNotFoundException : Exception
    {
        public SignatureNotFoundException(): base("signature wasnt found in configuration file. Please provide user name and email")
        {
            
        }
    }
}