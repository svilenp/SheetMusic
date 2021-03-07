using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SheetMusic.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult MusicSheet()
        {
            return View();
        }
    }
}