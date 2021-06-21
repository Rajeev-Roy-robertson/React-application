using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;
using Assignment2.Models;
using Microsoft.AspNetCore.Hosting;

namespace Assignment2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public PatientController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                select PatientId,PatientName,AddressNum,Phone,
                convert(varchar(10),DateofBirth,120) as DateofBirth,Doctor,DescPatient
                from dbo.patient";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("PatientCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(Patient pat)
        {
            string query = @"
                    insert into dbo.Patient
                    (PatientName,AddressNum,Phone,DateofBirth,Doctor,DescPatient)
                    values
                    ('" + pat.PatientName + @"'
                     ,'" + pat.AddressNum + @"'
                     ,'" + pat.Phone+ @"'
                     ,'" + pat.DateofBirth + @"'
                     ,'" + pat.Doctor + @"'
                     ,'" + pat.DescPatient + @"'
                    )
                    ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("PatientCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Added Successfully");
        }

        [HttpPut]
        public JsonResult Put(Patient pat)
        {
            string query = @"
                    update dbo.Patient set 
                    PatientName ='" + pat.PatientName + @"'
                    ,AddressNum ='" + pat.AddressNum + @"'
                    ,Phone ='" + pat.Phone + @"'
                    ,DateofBirth ='" + pat.DateofBirth + @"'
                    ,Doctor ='" + pat.Doctor + @"'
                    ,DescPatient ='" + pat.DescPatient + @"'

                    where PatientId = '" + pat.PatientId + @"'
                    ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("PatientCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Updated Successfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                    delete from dbo.patient 
                    where PatientId = " + id + @"
                    ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("PatientCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Deleted Successfully");
        }

        [Route("GetAllDoctorNames")]
        public JsonResult GetAllDepartmentNames()
        {
            string query = @"
                select DoctorName from dbo.doctor";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("PatientCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }

    }
}