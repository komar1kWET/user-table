using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Parm.FrontDev2.Models;
using Parm.FrontDev2.Infrastructure;

namespace Parm.FrontDev2.Repositories {
    public class Repository<T>: IRepository<T> where T: class {
        protected IDataContext Context{
            get { return _context; }
        }

        public Repository(IDataContext context) {
            _context = context;
        }

        private readonly IDataContext _context;
    }
}
