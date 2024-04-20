class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title); // TODO: replace this text using this.engine.storyData to find the story title
        this.engine.addChoice("Begin the story");
        this.engine.remembered = false;
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); // TODO: replace this text by the initial location of the story
    }
}

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key]; // TODO: use `key` to get the data object for the current story location
        console.log("Key check: " + locationData.Check);
        if (locationData.Check === "org")
        {
            this.engine.remembered = false;
        }
        if (locationData.Check == "pnt")
        {
            this.engine.remembered = true;
        }
        if (locationData.Check == "mem") {
            if(this.engine.remembered)
            {
                locationData.Body = "Adi's story is on my mind. Something stirs, and then I remember. I'm at a bus stop. Mama is there, and we're driving through it. I'd never tried gum before, but I wanted to because I saw her chewing it.\n'Хочешь один?' (Want one?) I reach to take it, but there's a flash. I look at it, and the car shakes and swerves as the blast hits us from the car-turned fireball across the street. Metal bounces and pings off of our car and its windows. Two people lie motionless, looking almost calm. At peace. A stark contrast to the burning metal and rubber around them.";
            }
            else
            {
                locationData.Body = "It's very strange. The pengiuns are harmless, but even so they change what Ari'el - MY town - is like. There's nothing to be done... but even my real home doesn't feel like home.";
            }
        }
        this.engine.show(locationData.Body); // TODO: replace this text by the Body of the location data
        if(locationData.Choices) {
            for(let choice of locationData.Choices) {
                this.engine.addChoice(choice.Text, choice);
            }
        } else {
            this.engine.addChoice("The end.")
        }
        
        console.log("Remembered: " + this.engine.remembered);
    }

    handleChoice(choice) {
        if(choice) {
            this.engine.show("&gt; "+choice.Text);
            if(choice.Target == "checkpoint2") {
                this.engine.remembered = true;
            }
            this.engine.gotoScene(Location, choice.Target);
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');