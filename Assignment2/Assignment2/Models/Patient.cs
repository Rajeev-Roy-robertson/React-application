using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Assignment2.Models
{
    public class Patient
    {
        public int PatientId { get; set; }

        public string PatientName { get; set; }

        public string AddressNum { get; set; }

        public string Phone { get; set; }

        public string DateofBirth { get; set; }

        public string Doctor { get; set; }

        public string DescPatient { get; set; }

    }
}
