namespace api.core.Features.Diff.ContentParsers.DirectDiffContentParser
{
    public enum LineDiffType
    {
        /// <summary>
        /// Line was not changed
        /// </summary>
        Unchanged = 0,
        /// <summary>
        /// Line was added
        /// </summary>
        Added = 1,
        /// <summary>
        /// Line was removed
        /// </summary>
        Removed = 2,
        /// <summary>
        /// Line does not exist (only applies to "before" status)
        /// </summary>
        Nonexistent = 4
    }
}
