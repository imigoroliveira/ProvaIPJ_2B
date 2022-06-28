using RabbitMQ.Client;
using System.Text;
using cadastro.Model;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace cadastro.Utils
{
    class Send
    {
        public static void Main(FolhaModel newFolha)
        {
            FolhaModel folha = newFolha;
            var factory = new ConnectionFactory() { HostName = "localhost" };
            using (var connection = factory.CreateConnection())
            using (var channel = connection.CreateModel())
            {
                channel.QueueDeclare(queue: "cadastrofolha",
                                     durable: false,
                                     exclusive: false,
                                     autoDelete: false,
                                     arguments: null);

                string jsonString = JsonSerializer.Serialize(folha);
                var body = Encoding.UTF8.GetBytes(jsonString);

                channel.BasicPublish(exchange: "",
                                     routingKey: "",
                                     basicProperties: null,
                                     body: body);
                Console.WriteLine(" [x] Sent {0}", body);
            }

        }
    }

}
