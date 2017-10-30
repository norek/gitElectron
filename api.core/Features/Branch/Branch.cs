using System;
using LibGit2Sharp;

namespace api.core.Features.Branch
{
    public class BranchCollection
    {

    }

    public class Branch
    {
        public Branch()
        {

        }

        public Branch(string name, bool isRemote, bool isHead, string tip)
        {
            Name = name;
            IsRemote = isRemote;
            IsHead = isHead;
            Tip = tip;
        }

        public string Name { get; set; }

        public bool IsRemote { get; set; }
        public bool IsHead { get; internal set; }
        public string Tip { get; internal set; }
        public bool IsTracking { get; set; }
        public TrackingDetails TrackingDetails { get; set; }
        public string CannonicalName { get; set; }
    }

    public class TrackingDetails
    {
        public TrackingDetails()
        {

        }

        public TrackingDetails(string trackingBranchCannonicalName, BranchTrackingDetails branchTrackingDetails)
        {
            AheadBy = branchTrackingDetails?.AheadBy;
            BehindBy = branchTrackingDetails?.BehindBy;
            CannonicalName = trackingBranchCannonicalName;
        }

        public string CannonicalName { get; set; }
        public int? AheadBy { get; }
        public int? BehindBy { get; }
    }
}
