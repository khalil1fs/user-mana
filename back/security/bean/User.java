package com.ird.faa.security.bean;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ird.faa.bean.Archivable;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;


@Entity
@Table(name = "user_app")
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public class User implements UserDetails, Archivable {

    @Id
    @SequenceGenerator(name = "user_seq", sequenceName = "user_seq",
            allocationSize = 1, initialValue = 10000)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq")
    protected Long id;

    protected boolean credentialsNonExpired;
    protected boolean enabled;

    @JsonFormat(pattern = "yyyy-MM-dd hh:mm:ss.SSS")
    @Temporal(TemporalType.TIMESTAMP)
    protected Date createdAt;

    @JsonFormat(pattern = "yyyy-MM-dd hh:mm:ss.SSS")
    @Temporal(TemporalType.TIMESTAMP)
    protected Date updatedAt;
    protected String email;
    protected boolean accountNonExpired;
    protected boolean accountNonLocked;
    protected String username;
    protected String password;
    protected String prenom;
    protected String nom;
    protected boolean passwordChanged;
    @Transient
    private String role;

    @Column(columnDefinition = "boolean default false")
    private Boolean archive = false;


    @JsonFormat(pattern = "yyyy-MM-dd hh:mm:ss.SSS")
    @Temporal(TemporalType.TIMESTAMP)
    private Date dateArchivage;

    public String getNumeroMatricule() {
        return numeroMatricule;
    }

    public void setNumeroMatricule(String numeroMatricule) {
        this.numeroMatricule = numeroMatricule;
    }


    @Transient
    protected String numeroMatricule;


    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "users_roles", joinColumns = {@JoinColumn(name = "USER_ID")}, inverseJoinColumns = {
            @JoinColumn(name = "ROLE_ID")})
    protected Collection<Role> roles = new ArrayList<>();

    @Transient
    protected Collection<Role> authorities;

    public User() {
        super();
    }

    public User(Long id, boolean credentialsNonExpired, boolean enabled, Date createdAt, Date updatedAt, String email, boolean accountNonExpired, boolean accountNonLocked, String username, String password, String prenom, String nom, boolean passwordChanged) {
        this.id = id;
        this.credentialsNonExpired = credentialsNonExpired;
        this.enabled = enabled;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.email = email;
        this.accountNonExpired = accountNonExpired;
        this.accountNonLocked = accountNonLocked;
        this.username = username;
        this.password = password;
        this.prenom = prenom;
        this.nom = nom;
        this.passwordChanged = passwordChanged;
    }

    public User(String username) {
        this.username = username;
        this.password = username;
        this.prenom = username;
        this.nom = username;
        this.email = username;
        // this.piloteDonnee = false;
    }

    @Override
    public Boolean getArchive() {
        return archive;
    }

    @Override
    public void setArchive(Boolean archive) {
        this.archive = archive;
    }

    @Override
    public Date getDateArchivage() {
        return dateArchivage;
    }

    @Override
    public void setDateArchivage(Date dateArchivage) {
        this.dateArchivage = dateArchivage;
    }

    @Override
    public Date getDateCreation() {
        return createdAt;
    }

    @Override
    public void setDateCreation(Date dateCreation) {
        this.createdAt = dateCreation;
    }


    public boolean getCredentialsNonExpired() {
        return credentialsNonExpired;
    }

    public boolean getEnabled() {
        return enabled;
    }

    public boolean getAccountNonExpired() {
        return accountNonExpired;
    }

    public boolean getAccountNonLocked() {
        return accountNonLocked;
    }

    public boolean getPasswordChanged() {
        return passwordChanged;
    }


    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public boolean isCredentialsNonExpired() {
        return credentialsNonExpired;
    }

    public void setCredentialsNonExpired(boolean credentialsNonExpired) {
        this.credentialsNonExpired = credentialsNonExpired;
    }


    public Collection<Role> getRoles() {
        return roles;
    }

    public void setRoles(Collection<Role> roles) {
        this.roles = roles;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }
//
//    public Date getCreatedAt() {
//        return createdAt;
//    }
//
//    public void setCreatedAt(Date createdAt) {
//        this.createdAt = createdAt;
//    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public boolean isAccountNonExpired() {
        return accountNonExpired;
    }

    public void setAccountNonExpired(boolean accountNonExpired) {
        this.accountNonExpired = accountNonExpired;
    }

    public boolean isAccountNonLocked() {
        return accountNonLocked;
    }

    public void setAccountNonLocked(boolean accountNonLocked) {
        this.accountNonLocked = accountNonLocked;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }


    public Collection<Role> getAuthorities() {
        if (this.authorities == null)
            this.authorities = this.roles;

        return authorities;
    }

    public void setAuthorities(Collection<Role> authorities) {
        this.authorities = authorities;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isPasswordChanged() {
        return passwordChanged;
    }

    public void setPasswordChanged(boolean passwordChanged) {
        this.passwordChanged = passwordChanged;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }


}
