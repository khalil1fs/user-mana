package  com.ird.faa.security.ws;

import java.util.List;
import java.util.Set;

import com.ird.faa.service.util.ListUtil;
import com.ird.faa.ws.rest.provided.converter.UserConverter;
import com.ird.faa.ws.rest.provided.vo.UserVo;
import com.ird.faa.ws.rest.provided.vo.formulaire.ChercheurVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ird.faa.security.common.AuthoritiesConstants;
import com.ird.faa.security.bean.User;
import com.ird.faa.security.service.facade.UserService;

@RequestMapping("/api/users")
@RestController
// @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
public class UserRest {
    @Autowired
    private UserService userService;

    @Autowired
    private UserConverter userConverter;

    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    @GetMapping("/")
    public List<User> findAll(){
        return this.userService.findAll();
    }

    @PostMapping("/find-all-with-creteria")
    public Set<UserVo> findAllWithCriteria(@RequestBody ChercheurVo chercheurVo) {
        List<UserVo> userVos = userConverter.toVo(ListUtil.toList(userService.findAllWithCriteria(chercheurVo)));
        return ListUtil.toSetVo(userVos);
    }

    @GetMapping("/pilotededonnees/")
    public List<User> findAllPiloteDeDonnees() {
        return userService.findAllPiloteDeDonnees();
    }


    public User findByUsername(String username) {
        return userService.findByUsername(username);
    }

    @GetMapping("/{id}")
    public User findById(@PathVariable Long id) {
        return userService.findById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        userService.deleteById(id);
    }

    @PostMapping("/save")
    public UserVo save(@RequestBody UserVo uservo) {
        User user = userConverter.toItem(uservo);
        return  userConverter.toVo(userService.save(user));
    }

    @PutMapping("/")
    public User update(@RequestBody User user) {
        return userService.update(user);
    }

    @DeleteMapping("/id/{id}")
    public int delete(@PathVariable Long id) {
        return userService.delete(id);
    }

    @GetMapping("/username/{username}")
    public User findByUsernameWithRoles(@PathVariable String username) {
        return userService.findByUsernameWithRoles(username);
    }

    @DeleteMapping("/username/{username}")
    public int deleteByUsername(@PathVariable String username) {
        return userService.deleteByUsername(username);
    }

}

