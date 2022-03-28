using EvaluationAPI.Models;
using EvaluationAPI.Settings;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EvaluationAPI.Services
{
    public class InternCollectionService : ICollectionService<Intern>
    {
        private readonly IMongoCollection<Intern> _interns;

        public InternCollectionService(IMongoDBSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _interns = database.GetCollection<Intern>(settings.InternCollectionName);

        }



        public async Task<List<Intern>> GetAll()
        {
            var result = await _interns.FindAsync(intern => true);
            return result.ToList();
        }

        public async Task<Intern> Get(Guid id)
        {
            var result = await _interns.FindAsync((note) => note.Id.Equals(id)).Result.ToListAsync();
            if (result.Count.Equals(0))
            {
                return null;
            }
            return result.Where(note => note.Id.Equals(id)).ToList().First();
        }

        async public Task<bool> Create(Intern model)
        {
            var result = await _interns.FindAsync((note) => note.Id.Equals(model.Id)).Result.ToListAsync();
            if (result.Count.Equals(0))
            {
                await _interns.InsertOneAsync(model);
                return true;
            }
            return false;
        }

        async public Task<bool> Update(Guid id, Intern model)
        {
            var result = await _interns.ReplaceOneAsync(intern => intern.Id.Equals(id), model);
            if (result.IsAcknowledged && result.ModifiedCount.Equals(0))
            {
                return false;
            }

            return true;
        }

        async public Task<bool> Delete(Guid id)
        {
            var result = await _interns.DeleteOneAsync((intern) => intern.Id == id);

            if (result.IsAcknowledged && result.DeletedCount.Equals(0))
            {
                return false;
            }
            return true;
        }
    }
}
