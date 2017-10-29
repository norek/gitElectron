export enum CommitChangeType {
    Undefined = -1,
    //
    // Summary:
    //     No changes detected.
    Unmodified = 0,
    //
    // Summary:
    //     The file was added.
    Added = 1,
    //
    // Summary:
    //     The file was deleted.
    Deleted = 2,
    //
    // Summary:
    //     The file content was modified.
    Modified = 3,
    //
    // Summary:
    //     The file was renamed.
    Renamed = 4,
    //
    // Summary:
    //     The file was copied.
    Copied = 5,
    //
    // Summary:
    //     The file is ignored in the workdir.
    Ignored = 6,
    //
    // Summary:
    //     The file is untracked in the workdir.
    Untracked = 7,
    //
    // Summary:
    //     The type (i.e. regular file, symlink, submodule, ...) of the file was changed.
    TypeChanged = 8,
    //
    // Summary:
    //     Entry is unreadable.
    Unreadable = 9,
    //
    // Summary:
    //     Entry is currently in conflict.
    Conflicted = 10
}
