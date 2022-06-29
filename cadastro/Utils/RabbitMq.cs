using RabbitMQ.Client;
using System;
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
            TimeSpan tsInstance1 = new TimeSpan(60);
            ConnectionFactory factory = new ConnectionFactory
            {
                HostName = "localhost",
                Port = Protocols.DefaultProtocol.DefaultPort,
                UserName = "guest",
                Password = "guest",
                VirtualHost = "/",
                RequestedHeartbeat = tsInstance1
            };

            using (IConnection? connection = factory.CreateConnection())
            {
                using (var channel = connection.CreateModel())
                {
                    channel.QueueDeclare(queue: "cadastrofolha",
                                         durable: true,
                                         exclusive: false,
                                         autoDelete: false,
                                         arguments: null);

                    string jsonString = JsonSerializer.Serialize(folha);
                    var body = Encoding.UTF8.GetBytes(jsonString);

                    var properties = channel.CreateBasicProperties();
                    channel.BasicPublish(exchange: "",
                                         routingKey: "",
                                         basicProperties: properties,
                                         body: body);
                    Console.WriteLine(" [x] Sent {0}", body);
                }
            }


        }
    }

}
