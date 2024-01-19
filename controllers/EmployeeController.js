// import Model Employee
const Employee = require("../models/Employee");

// buat class EmployeeController
class EmployeeController {
  // buat fungsi
    async index(req, res) {
      const employees = await Employee.all();

      if(employees.length > 0) {
          const data = {
              message: "Menampilkan seluruh data employee",
              data: employees,
          }
          return res.status(200).json(data);
      }

      //else
      const data = {
          message: "Data Employee tidak ditemukan",
      };

      return res.status(404).json(data);
    }

    async store(req, res) {
      const { name, gender, phone, address, email, status, hired_on} = req.body

      if (!name || !gender || !phone || !address || !email || !status || !hired_on) {
          const data = {
              message: "Data tidak lengkap",
          };

          return res.status(422).json(data);
      }

      const employee = await Employee.create(req.body);

      const data = {
          message: "Menambahkan data Employee",
          data: employee,
      };

      return res.status(201).json(data);
  }

  async update(req, res) {
    const { id } = req.params;

    const employee = await Employee.find(id);

    if (employee) {
        // update data
        const EmployeeUpdated = await Employee.update(id, req.body);
        const data = {
            message: "Mengupdate data employee",
            data: EmployeeUpdated,
        };

        res.status(200).json(data);
    }
    else {
        // kirim data tidak ada
        const data = {
            message: "Data tidak ada",
        };

        res.status(404).json(data);
    }
  }


  async destroy(req, res) {
    const { id } = req.params;

    const employee = await Employee.find(id);

    if (employee) {
        // hapus data
        await Employee.delete(id);
        const data = {
            message: "Menghapus data employee",
        };

        res.status(200).json(data);
    }
    else {
        // data tidak ada
        const data = {
            message: "Data tidak ada",
        };

        res.status(404).json(data);
    }
  }

  async show(req, res) {
    const { id } = req.params;

    const employee = await Employee.find(id);

    if (employee) {
        const data = {
            message: "Menampilkan detail data employee",
            data: employee,
        };

        res.status(200).json(data);
    }
    else {
        const data = {
            message: "Data tidak ada",
        };

        res.status(404).json(data);
    }

  }


  async search(req, res) {
    const { name } = req.params;

    const employee = await Employee.search(name);

    if (employee.length > 0) {
        const data = {
            message: "Menemukan data employee",
            data: employee,
        };

        res.status(200).json(data);
    }
    else {
        const data = {
            message: "Data employee tidak ditemukan",
        };

        res.status(404).json(data);
    }
  }

  // async findByStatus(req, res) {
  //   try {
  //     const { status } = req.params;
  
  //     let employees;
  //     if (status === 'active' || status === 'inactive' || status === 'terminated') {
  //       employees = await Employee.findByStatus(status);
  //     } else {
  //       const data = {
  //         message: "Invalid status provided",
  //       };
  //       return res.status(400).json(data);
  //     }
  
  //     if (employees && employees.length > 0) {
  //       const data = {
  //         message: `Menemukan data employee dengan status ${status}`,
  //         data: employees,
  //       };
  
  //       return res.status(200).json(data);
  //     } else {
  //       const data = {
  //         message: `Data employee dengan status ${status} tidak ditemukan`,
  //       };
  
  //       return res.status(404).json(data);
  //     }
  //   } catch (error) {
  //     console.error('Error in findByStatus:', error);
  
  //     const data = {
  //       message: 'Internal Server Error',
  //     };
  
  //     return res.status(500).json(data);
  //   }
  // }
  async getActiveEmployees(req, res) {
    try {
      const employees = await Employee.findByStatus('active');
  
      if (employees && employees.length > 0) {
        const data = {
          message: "Menemukan data employee dengan status active",
          data: employees,
        };
  
        return res.status(200).json(data);
      } else {
        const data = {
          message: "Data employee dengan status active tidak ditemukan",
        };
  
        return res.status(404).json(data);
      }
    } catch (error) {
      console.error('Error in getActiveEmployees:', error);
  
      const data = {
        message: 'Internal Server Error',
      };
  
      return res.status(500).json(data);
    }
  }

  async getInactiveEmployees(req, res) {
    try {
      const employees = await Employee.findByStatus('inactive');
  
      if (employees && employees.length > 0) {
        const data = {
          message: "Menemukan data employee dengan status inactive",
          data: employees,
        };
  
        return res.status(200).json(data);
      } else {
        const data = {
          message: "Data employee dengan status inactive tidak ditemukan",
        };
  
        return res.status(404).json(data);
      }
    } catch (error) {
      console.error('Error in getInactiveEmployees:', error);
  
      const data = {
        message: 'Internal Server Error',
      };
  
      return res.status(500).json(data);
    }
  }

  async getTerminatedEmployees(req, res) {
    try {
      const employees = await Employee.findByStatus('terminated');
  
      if (employees && employees.length > 0) {
        const data = {
          message: "Menemukan data employee dengan status terminated",
          data: employees,
        };
  
        return res.status(200).json(data);
      } else {
        const data = {
          message: "Data employee dengan status terminated tidak ditemukan",
        };
  
        return res.status(404).json(data);
      }
    } catch (error) {
      console.error('Error in getTerminatedEmployees:', error);
  
      const data = {
        message: 'Internal Server Error',
      };
  
      return res.status(500).json(data);
    }
  }
  
  

}
// membuat object EmployeeController
const object = new EmployeeController();

// export object EmployeeController
module.exports = object;
