package org.vilagszep.servermesetar.data.entityEnum;

//these enums are created for fixed database data, so nothing else can be stored
public enum AgeGroup {
    Idősebb_gyerekeknek,
    Kisiskolás_korosztálytól,
    Óvodás_kortól;

    //this method will check if the provided string is the same as the current ageGroup element
    public boolean isThisType(String elem){
        return this.name().equals(elem);
    }
}
