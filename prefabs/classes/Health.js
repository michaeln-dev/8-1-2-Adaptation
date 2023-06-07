// This health class manages entity health
class Health {
    constructor(scene, maxHealth) {
        this.scene = scene;
        this.maxHealth = maxHealth;
        this.currentHealth = maxHealth;
    }

    gain_health (heal_amount) {
        this.currentHealth += heal_amount;

        // If the entity was healed past its max
        if (this.currentHealth > this.maxHealth) {
            this.currentHealth = this.maxHealth;
        }
    }

    lose_health (damage_amount) {
        this.currentHealth -= damage_amount;

        // If the entity lost all health
        if (this.currentHealth <= 0) {
            this.health_depleated();
        }
    }

    health_depleated() {
    }
}