﻿namespace api.core.Features.Configuration
{
    public class RepositoryConfiguration
    {
        public UserInfo User { get; set; }

        public string CurrentRepository { get; set; }
        public Branch.Branch CurrentBranch { get; set; }
    }
}
