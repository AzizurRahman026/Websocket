using ChatApplication;
using ChatApplication.Hub;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSignalR();
// builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<IDictionary<string, UserRoomConnection>>(opt =>
    new Dictionary<string, UserRoomConnection>());
builder.Services.AddCors();


var app = builder.Build();
app.UseCors(x => x.AllowAnyHeader().AllowCredentials().AllowAnyMethod().WithOrigins("http://localhost:5000", "http://localhost:4200"));


// Enable Swagger...
/*if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}*/

app.UseRouting();

app.UseEndpoints(endpoint =>
{
    endpoint.MapHub<ChatHub>("/chat");
});

// app.MapControllers();

app.Run();
