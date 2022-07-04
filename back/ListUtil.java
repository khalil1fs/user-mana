package com.ird.faa.service.util;


import com.ird.faa.security.bean.User;
import com.ird.faa.ws.rest.provided.vo.UserVo;

import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;


public class ListUtil {
    public static boolean isEmpty(List objects) {
        return objects == null || objects.isEmpty();
    }

    public static boolean isNotEmpty(List objects) {
        return !isEmpty(objects);
    }

    public static List<User> toList(List<User> list1,List<User> list2){
        return Stream.of(list1, list2)
                .flatMap(Collection::stream)
                .collect(Collectors.toList());
    }
  public static Set<User> toSet(List<User> list1,List<User> list2){
        return Stream.of(list1, list2)
                .flatMap(Collection::stream)
                .collect(Collectors.toSet());
    }

    public static List<User> toList(Set<User> set1,Set<User> set2){
        return Stream.of(set1, set2)
                .flatMap(Collection::stream)
                .collect(Collectors.toList());
    }




    public static List<User> toList(Set<User> objects){
        List<User> toList = Stream.of(objects)
                .flatMap(Collection::stream)
                .collect(Collectors.toList());
        return toList;
    }
    public static Set<User> toSet(List<User> users){
        Set<User> toSet = Stream.of(users)
                .flatMap(Collection::stream)
                .collect(Collectors.toSet());
        return toSet;
    }

   public static Set<UserVo> toSetVo(List<UserVo> users){
        Set<UserVo> toSet = Stream.of(users)
                .flatMap(Collection::stream)
                .collect(Collectors.toSet());
        return toSet;
    }






}
