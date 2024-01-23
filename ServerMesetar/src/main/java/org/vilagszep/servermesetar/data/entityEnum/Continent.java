package org.vilagszep.servermesetar.data.entityEnum;

//these enums are created for fixed database data, so nothing else can be stored
public enum Continent {
    Ázsia,
    Afrika,
    Észak_Amerika,
    Dél_Amerika,
    Antarktika,
    Európa,
    Ausztrália;

    //this method will check if the provided string is the same as the current continent enum
    public boolean isThisType(String elem){
        return this.name().equals(elem);
    }
}
