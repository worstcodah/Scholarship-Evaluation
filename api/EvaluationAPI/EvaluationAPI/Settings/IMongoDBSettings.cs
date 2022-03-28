using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EvaluationAPI.Settings
{
    public interface IMongoDBSettings
    {
        string InternCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}
