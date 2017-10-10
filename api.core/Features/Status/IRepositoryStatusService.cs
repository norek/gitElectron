using System.Collections.Generic;

namespace api.core.Features.Status
{
    public interface IRepositoryStatusService
    {
        IEnumerable<StatusItem> GetAll();

        void Stage(StatusItem statusItem);

        void Unstage(StatusItem statusItem);
    }
}