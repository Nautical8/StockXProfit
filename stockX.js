

const Discord = require('discord.js');
const client = new Discord.Client();
const token = ''; //Put your discord bot token here

const StockXAPI = require('stockx-api');
const stockX = new StockXAPI();
 var sizes
 var iamge
 var info
 var name
 var retail

var fs = require('fs');


client.login(token);

client.on("ready", () => {
	console.log('Client Online... Awaiting Webhooks');
});


client.on('message', (receivedMessage) => {
	if (receivedMessage.author == client.user) { // Prevent bot from responding to its own messages
		return
	}

	if (receivedMessage.content.startsWith("!")) {

		processCommand(receivedMessage)
	}

	function processCommand(receivedMessage) {
		let fullCommand = receivedMessage.content.substr(1) // Remove the leading exclamation mark
		let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
		let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
		let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

     


			if (primaryCommand == "stockX") {


                
                retail =parseInt( arguments[1])

				primCommand(arguments, receivedMessage)

               
			} 


            function primCommand(arguments,receivedMessage) {

          

        
                stockX.fetchProductDetails(arguments[0])
                .then(product => {
                    
                    
                    image=product.image
                    sizes=product.variants
                    name=product.name


                    console.log(product)

                
                    for(var i=0;product.variants.length>i;i++){
                
                        info=product.variants[i].market
                
                    }
                

                            const exampleEmbed = new Discord.MessageEmbed()

                            
                        .setColor('') //Set the color hex code that you want 
                        .setTitle('Product Profit Details')
                        .setThumbnail(image)
                        .addField('Product Name', '['+name+']'+ '('+arguments[0]+')')

                      
                     
                        .setTimestamp()
                        .setFooter('StockX • Nautical#1010', ''); //set The footer image ad the empty string


                        var first= sizes[0].market.highestBid-retail

                        var number = null;

                        for (var i = 0; i < product.variants.length; i++) {
                            // Update current number
                            number = sizes[i].market.highestBid-retail;
                    
                            // Compares stored largest number with current number, stores the largest one
                            first = Math.max(first, number);
                            //indicates the most profit
                        }
                        
                        

                        for(var i=0;product.variants.length>i;i++){


                            var tempHigh=sizes[i].market.highestBid-retail

                            var tempSale=sizes[i].market.lastSale-retail


                                    if(tempHigh==first){

                                        exampleEmbed.addField( sizes[i].size +' <:star:814886098312495114>','Highest Bid: $'+first.toString()+'\n Last Sale: $'+tempSale.toString() ,true)

                                        //puts a star next to the highest profit size
                                        

                                    }
                                
                                    exampleEmbed.addField( sizes[i].size,'Highest Bid: $'+tempHigh.toString()+'\n Last Sale: $'+tempSale.toString() ,true)




                    
                        }

             receivedMessage.channel.send(exampleEmbed)



                   
                } )
                
                
                .catch(err => console.log(`Error scraping product details: ${err.message}`));
                


                

            }
	}
});