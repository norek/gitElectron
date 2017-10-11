namespace Core.Features.Branch
{
    public class Branch
    {
        public Branch()
        {

        }

        public Branch(string name, bool isRemote, bool isHead, string tip)
        {
            this.Name = name;
            this.IsRemote = isRemote;
            this.IsHead = isHead;
            this.Tip = tip;
        }

        public string Name { get; set; }

        public bool IsRemote { get; set; }
        public bool IsHead { get; internal set; }
        public string Tip { get; internal set; }
    }
}
