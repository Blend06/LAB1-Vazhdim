use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use app\Http\Controllers\API\ExampleController;
use app\Http\Controllers\StudentController;
use app\Http\Controllers\Api\AuthController;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post(/register,[AuthController::class, 'register']);
Route::post(/login,[AuthController::class, 'login']);
Route::post(/logout,[AuthController::class, 'logout']);



