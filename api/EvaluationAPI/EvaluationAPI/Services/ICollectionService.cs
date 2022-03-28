using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EvaluationAPI.Services
{
    public interface ICollectionService<T>
    {
        public Task<List<T>> GetAll();

        public Task<T> Get(Guid id);
        public Task<bool> Create(T model);


        public Task<bool> Update(Guid id, T model);

        public Task<bool> Delete(Guid id);
    }
}
