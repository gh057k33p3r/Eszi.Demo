## Entity Framework tool install

<pre>
dotnet tool install --global dotnet-ef --version 8.*
</pre>

## Add Migration
<pre>
dotnet ef migrations add Initial --project Eszi.Demo.Database --startup-project Eszi.Demo.Server --context CoreDbContext
</pre>

