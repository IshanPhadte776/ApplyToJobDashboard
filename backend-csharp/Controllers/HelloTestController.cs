using Microsoft.AspNetCore.Mvc;

namespace backend_csharp.Controllers
{
    [ApiController]
    [Route("api/hellotest")]
    public class HelloTestController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetHello()
        {
            return Ok("Hello testing");
        }
    }
}
