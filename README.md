# Okie-Pub

A simple publisher plugin used to make arbitrary objects publishers

## usage:

To make an object a publisher:

    okiePub.makePublisher(targetObject);

Then objects can subscribe to events like so:

    targetObject.subscribe( [event type name], [event callback], [optional context]);
