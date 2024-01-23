package org.vilagszep.servermesetar.data.entityEnum;

//these enums are created for fixed database data, so nothing else can be stored
public enum CopyRight {
    Csak_belső_használatra,

    Köztulajdon;

    //this method will check if the provided string is the same as the current copyRight enum
    public boolean isThisType(String elem){
        return this.name().equals(elem);
    }

}
